---
title: "Installing and Configuring Nginx on Ubuntu 22.04"
description: "A step-by-step guide to installing Nginx, serving a custom site, and hardening your configuration on Ubuntu 22.04."
date: "2025-02-17"
tags: [nginx, linux, ubuntu, devops]
---

# Installing and Configuring Nginx on Ubuntu 22.04

Nginx has become my go-to web server whenever I need something fast, reliable, and easy to scale. In this article I’ll show you how I install and configure it on a fresh Ubuntu 22.04 server—from the first package update to serving a custom site securely.

## Prerequisites

- Ubuntu 22.04 server with SSH access
- `sudo` user (or root)
- Domain name pointed at the server (optional, but handy for the later steps)
- Firewall configured to allow SSH—UFW, firewalld, or your cloud provider’s ruleset all work

## Step 1 — Update the server

I start every server session with a quick package refresh to pull in the latest security patches:

```bash
sudo apt update
sudo apt upgrade
```

When the upgrade step asks to continue, I confirm with `Y`.

## Step 2 — Install Nginx

Ubuntu’s repositories already ship Nginx, so the install is one command away:

```bash
sudo apt install nginx
```

The systemd service kicks off automatically. You can verify it:

```bash
sudo systemctl status nginx
```

If everything went well you’ll see "active (running)". Hit `q` to leave the status view.

## Step 3 — Adjust the firewall

If you rely on UFW, allow the `Nginx Full` application profile so HTTP/HTTPS traffic is accepted:

```bash
sudo ufw allow 'Nginx Full'
```

Unsure about the current state? `sudo ufw status` gives you the list of active rules. Feel free to skip this if you’re using a different firewall.

## Step 4 — Test the default site

Nginx ships with a landing page. Grab the server’s IP:

```bash
hostname -I
```

Paste it into your browser; you should land on the "Welcome to nginx!" placeholder.

Prefer cURL? This works too:

```bash
curl -I http://your_server_ip
```

You’re looking for a `200 OK` in the return headers.

## Step 5 — Create your own site

The default placeholder isn’t helpful for long. I favor a separate root folder per site:

```bash
sudo mkdir -p /var/www/example.com/html
sudo chown -R $USER:$USER /var/www/example.com/html
sudo chmod -R 755 /var/www/example.com
```

Swap `example.com` for your domain or any identifier (you can use `myproject`). Add a quick test page:

```bash
cat <<'HTML' > /var/www/example.com/html/index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>It works!</title>
  </head>
  <body>
    <h1>Nginx is serving my site 🎉</h1>
  </body>
</html>
HTML
```

## Step 6 — Define an Nginx server block

Nginx lets us keep configurations tidy through server blocks. Create one for your site:

```bash
sudo nano /etc/nginx/sites-available/example.com
```

Drop this configuration (again, replace the domain and the root path if needed):

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name example.com www.example.com;

    root /var/www/example.com/html;
    index index.html;

    access_log /var/log/nginx/example.com.access.log;
    error_log  /var/log/nginx/example.com.error.log;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Save and exit (`Ctrl+O`, `Enter`, `Ctrl+X` in nano).

Enable the site by linking it into `sites-enabled`:

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```

To keep things clean, remove the default site unless you need it:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

## Step 7 — Validate the configuration and reload

Nginx includes a linting command. I always run it before reloading:

```bash
sudo nginx -t
```

If it says "test is successful," apply the changes:

```bash
sudo systemctl reload nginx
```

Refreshing the browser should now show the custom page we made earlier.

## Step 8 — (Optional) Secure it with Let’s Encrypt

If your domain resolves to the server, Let’s Encrypt can issue a free TLS certificate.

Install Certbot and the Nginx plugin:

```bash
sudo apt install certbot python3-certbot-nginx
```

Request a certificate:

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

Certbot updates your server block, requests HTTPS, and sets an automatic renewal timer. You can simulate the renewal job to be sure:

```bash
sudo certbot renew --dry-run
```

## Step 9 — Know the common maintenance commands

Here are the systemctl commands I keep handy:

```bash
# Check status
sudo systemctl status nginx

# Restart (useful after module or config changes)
sudo systemctl restart nginx

# Stop or start (rare, but good to know)
sudo systemctl stop nginx
sudo systemctl start nginx

# Enable Nginx at boot (usually already set)
sudo systemctl enable nginx
```

Logs live in `/var/log/nginx`. Use `tail -f` to inspect them in real time.

## Wrapping up

That’s the workflow I follow whenever I provision a new Ubuntu 22.04 box:

1. Update the server
2. Install Nginx
3. Punch through the firewall
4. Serve a custom site from `/var/www`
5. Optionally secure it with Let’s Encrypt
6. Keep the service healthy with systemctl + logs

If you run into issues (think "403 Forbidden" or "502 Bad Gateway"), the Nginx error log usually points to the exact file or upstream service that needs attention. Happy hosting!

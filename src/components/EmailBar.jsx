const EmailBar = ({ email }) => (
  <aside className="email-bar">
    <a href={`mailto:${email}`}>{email}</a>
  </aside>
)

export default EmailBar

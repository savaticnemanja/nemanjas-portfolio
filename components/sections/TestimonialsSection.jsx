import content from '@content/en'
import { Reveal, Stagger } from '@components/motion'

/**
 * Client quotes, one card each.
 *
 * `<figure>`/`<blockquote>`/`<figcaption>` rather than divs, because that is
 * the one structure that ties an attribution to the words it belongs to — a
 * screen reader reading the caption knows whose quote it just heard, and a
 * `cite` on a `<div>` would carry none of that.
 *
 * Stagger over Reveal even though there is one quote today: a second one is a
 * content edit, and this way it lands in sequence rather than needing the
 * component changed with it.
 *
 * `data-count` is the whole of the layout contract. The grid needs to know how
 * many cards it is laying out — one is a full-width panel, three are a row of
 * equals — and CSS cannot count its own children without a quantity query per
 * case. Writing the number out here keeps that decision in one attribute and
 * the rules in globals.css legible.
 */
const TestimonialsSection = () => {
  const { testimonials } = content

  return (
    <>
      <Reveal className="section-header">
        <div>
          <p className="eyebrow">02 — Testimonials</p>
          <h2 id="testimonials-heading" className="section-title">
            What clients <em>say</em>
          </h2>
        </div>
        <p className="section-note">{testimonials.note}</p>
      </Reveal>

      <Stagger className="quotes" data-count={testimonials.quotes.length}>
        {testimonials.quotes.map((item) => (
          <figure key={item.name} className="card quote">
            {/* Decorative: the blockquote already says this is a quotation, and
                a screen reader announcing a stray closing curly quote at the
                top of the card would only be noise. */}
            <span className="quote-mark" aria-hidden="true">&rdquo;</span>

            <blockquote className="quote-body">
              {item.quote.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </blockquote>

            <figcaption className="quote-by">
              <span className="quote-who">
                <span className="quote-name">{item.name}</span>
                <span className="quote-role">{item.role}</span>
              </span>

              {item.projects?.length ? (
                <span className="quote-projects">
                  {item.projects.map((project) => (
                    <a
                      key={project.href}
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="tag quote-project"
                    >
                      {project.label}
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </span>
              ) : null}
            </figcaption>
          </figure>
        ))}
      </Stagger>
    </>
  )
}

export default TestimonialsSection

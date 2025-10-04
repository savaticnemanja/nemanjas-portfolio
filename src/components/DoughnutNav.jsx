const DoughnutNav = ({ sections, doughnutOrder, activeSectionId }) => {
  const total = doughnutOrder.length
  const wheelIndex = doughnutOrder.indexOf(activeSectionId)
  const normalizedWheelIndex = wheelIndex >= 0 ? wheelIndex : 0

  return (
    <div className="doughnut-nav" aria-hidden="true">
      <svg viewBox="0 0 140 140" className="doughnut-nav__svg">
        <defs>
          <path id="doughnut-outer" d="M70,10 A60,60 0 1,1 69.99,10" />
        </defs>
        <g className="doughnut-nav__wheel">
          {doughnutOrder.map((id, orderIndex) => {
            const section = sections.find((item) => item.id === id)
            if (!section) return null

            const isActive = section.id === activeSectionId
            const relativeIndex = ((orderIndex - normalizedWheelIndex + total) % total)
            const rotation = relativeIndex * 90 - 45

            return (
              <g
                key={section.id}
                className="doughnut-nav__segment"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <text className={`doughnut-nav__label${isActive ? ' is-active' : ''}`}>
                  <textPath href="#doughnut-outer" startOffset="25%" textAnchor="middle">
                    {section.shortLabel.toUpperCase()}
                  </textPath>
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}

export default DoughnutNav

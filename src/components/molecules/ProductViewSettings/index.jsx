import { useEffect, useRef } from 'react'

export default function ProductViewSettings({ viewMode, onChange }) {
  const settingsRef = useRef(null)

  useEffect(() => {
    function handlePointerDown(event) {
      if (
        settingsRef.current?.open &&
        !settingsRef.current.contains(event.target)
      ) {
        settingsRef.current.open = false
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape' && settingsRef.current?.open) {
        settingsRef.current.open = false
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <details className="view-settings" ref={settingsRef}>
      <summary className="view-settings-trigger">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4 7h16M4 17h16" />
          <circle cx="9" cy="7" r="2" />
          <circle cx="15" cy="17" r="2" />
        </svg>
        Pengaturan
      </summary>
      <div
        className="view-settings-menu"
        role="group"
        aria-labelledby="view-settings-title"
      >
        <p className="view-settings-title" id="view-settings-title">
          Tampilan produk
        </p>
        <label>
          <input
            type="radio"
            name="product-view"
            value="grid"
            checked={viewMode === 'grid'}
            onChange={() => {
              onChange('grid')
              settingsRef.current.open = false
            }}
          />
          Grid
        </label>
        <label>
          <input
            type="radio"
            name="product-view"
            value="list"
            checked={viewMode === 'list'}
            onChange={() => {
              onChange('list')
              settingsRef.current.open = false
            }}
          />
          List
        </label>
      </div>
    </details>
  )
}

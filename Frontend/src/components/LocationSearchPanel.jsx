import React from 'react'

const LocationSearchPanel = ({
  // flexible: supports either `suggestions` OR separate pickup/destination suggestion arrays
  suggestions,
  pickupSuggestions,
  destinationSuggestions,

  // setters & current values (Home passes these in my suggested integration)
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  setPickupSuggestions,
  setDestinationSuggestions,

  // which field is active (supports both names)
  activeField,
  focused,

  // optional current values to decide whether to open vehicle panel after selection
  pickup,
  destination,

  // fare calculation function passed from Home
  findTrip,
}) => {
  // which field is active (supports both prop names)
  const active = activeField ?? focused

  // choose which suggestion list to render (backwards compatible)
  const list = suggestions ?? (active === 'pickup' ? pickupSuggestions : destinationSuggestions) ?? []

  const getTextFromSuggestion = (s) => {
    if (!s && s !== 0) return ''
    if (typeof s === 'string') return s
    // common shapes from different APIs
    return s.description ?? s.place_name ?? s.formatted_address ?? s.name ?? s.text ?? String(s)
  }

  const handlePostSelection = async (value) => {
    // clear suggestions if setters exist
    if (active === 'pickup' && typeof setPickupSuggestions === 'function') setPickupSuggestions([])
    if (active === 'destination' && typeof setDestinationSuggestions === 'function') setDestinationSuggestions([])

    // close search panel
    if (typeof setPanelOpen === 'function') setPanelOpen(false)

    // if both pickup+destination are now present, fetch fare and open vehicle panel
    const newPickup = active === 'pickup' ? value : pickup
    const newDestination = active === 'destination' ? value : destination
    if (newPickup && newDestination && typeof findTrip === 'function') {
      // Call findTrip to fetch fare and open vehicle panel
      await findTrip()
    }
  }

  const handleSuggestionClick = (suggestion) => {
    const text = getTextFromSuggestion(suggestion)

    if (active === 'pickup' && typeof setPickup === 'function') {
      setPickup(text)
    } else if (active === 'destination' && typeof setDestination === 'function') {
      setDestination(text)
    }

    handlePostSelection(text)
  }

  const handleKeyDown = (e, suggestion) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSuggestionClick(suggestion)
    }
  }

  return (
    <div>
      {(list || []).map((elem, idx) => {
        const text = getTextFromSuggestion(elem)
        const key = (elem && (elem.place_id || elem.id || elem.placeId)) ?? idx

        return (
          <div
            key={key}
            role="button"
            tabIndex={0}
            onClick={() => handleSuggestionClick(elem)}
            onKeyDown={(e) => handleKeyDown(e, elem)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full" aria-hidden>
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="font-medium">{text}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel

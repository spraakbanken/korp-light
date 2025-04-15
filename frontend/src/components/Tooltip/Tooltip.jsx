import React, { useState, useRef, cloneElement } from 'react';
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from '@floating-ui/react-dom';

export default function Tooltip({ children, content, placement = 'bottom' }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  const { x, y, reference, floating, strategy } = useFloating({
    placement,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  // Set up the ref properly
  const setRefs = (element) => {
    // Update our local ref
    if (triggerRef.current !== element) {
      triggerRef.current = element;
    }
    
    // Update floating-ui's ref
    if (element) {
      reference(element);
    }
  };

  // Clone the child to bind ref and event handlers
  const trigger = React.isValidElement(children)
    ? cloneElement(children, {
        ref: setRefs,
        onMouseEnter: (e) => {
          setOpen(true);
          // Call the original onMouseEnter if it exists
          if (children.props.onMouseEnter) {
            children.props.onMouseEnter(e);
          }
        },
        onMouseLeave: (e) => {
          setOpen(false);
          // Call the original onMouseLeave if it exists
          if (children.props.onMouseLeave) {
            children.props.onMouseLeave(e);
          }
        },
      })
    : null;

  return (
    <>
      {trigger}
      {open && (
        <div
          ref={floating}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            background: 'black',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '0.875rem',
            zIndex: 9999,
            pointerEvents: 'none', // Prevents tooltip from interfering with mouse events
            whiteSpace: 'nowrap',
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}
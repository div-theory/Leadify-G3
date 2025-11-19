import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      // This margin defines the "active area" of the viewport.
      // -20% from top: don't trigger until it's a bit down (accounting for header)
      // -50% from bottom: trigger when the top of the section hits the middle-ish
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
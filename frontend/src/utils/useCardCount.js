import { useState } from "react";

export function useCardCount(count, breackpoint) {
  const [countAddFilms, setCountAddFilms] = useState(0);
  const [startCountFilms, setStartCountFilms] = useState(0);

  function setParamsCountFilms(mode) {
    const deviceWidth = document.documentElement.clientWidth;
    const isUpdate = mode === "all";

    const middleDevice =
      deviceWidth <= breackpoint.two && deviceWidth > breackpoint.one;
    const smallDevice = deviceWidth <= breackpoint.one && deviceWidth >= 320;

    if (middleDevice) {
      setCountAddFilms(count.normal_screen.add);
      isUpdate && setStartCountFilms(count.normal_screen.start);
    } else if (smallDevice) {
      setCountAddFilms(count.narrow_screen.add);
      isUpdate && setStartCountFilms(count.narrow_screen.start);
    } else {
      setCountAddFilms(count.wide_screen.add);
      isUpdate && setStartCountFilms(count.wide_screen.start);
    }
  }

  return { countAddFilms, startCountFilms, setParamsCountFilms };
}

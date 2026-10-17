import { useEffect, useState } from "react";
import { api } from "../api";
import type { WardOptions } from "../interfaces/Ward";

// Ward form-er floor ar type dropdown
export function useWardOptions() {
  const [options, setOptions] = useState<WardOptions>({ floors: [], types: [] });

  useEffect(() => {
    api
      .get("wards/options")
      .then(function (res) {
        setOptions({
          floors: res.data.floors ?? [],
          types: res.data.types ?? [],
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return options;
}

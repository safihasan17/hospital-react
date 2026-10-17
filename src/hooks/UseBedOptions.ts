import { useEffect, useState } from "react";
import { api } from "../api";

// Bed form-er ward dropdown
export function useBedOptions() {
  const [wards, setWards] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    api
      .get("wards")
      .then(function (res) {
        setWards(res.data.wards ?? []);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return { wards };
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePhotos(albumId) {
  return useQuery({
    queryKey: ["photos", albumId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
      );
      return data;
    },
  });
}

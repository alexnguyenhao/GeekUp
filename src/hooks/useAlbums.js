import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAlbums(page = 1, pageSize = 10) {
  return useQuery({
    queryKey: ["albums", page, pageSize],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return {
        albums: data.slice(start, end),
        total: data.length,
      };
    },
  });
}

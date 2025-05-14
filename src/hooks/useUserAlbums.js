import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export function useUserAlbums(userId) {
  return useQuery({
    queryKey: ["userAlbums", userId],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      );
      return data;
    },
    enabled: !!userId,
  });
}


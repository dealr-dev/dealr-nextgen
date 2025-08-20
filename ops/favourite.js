import { favoriteAPI } from "../services";
import { getS3BucketFile } from "../utils";

export async function getFavorites(user, page, size, sort) {
  const response = await favoriteAPI.getFavorites(user, page, size, sort);
  const { vehicles } = response;

  if (!vehicles || vehicles.length === 0) return response;

  const urls = await Promise.all(
    vehicles.map(v =>
      v.imagekey ? getS3BucketFile(v.imagekey) : Promise.resolve(v.image || v.imageurl)
    )
  );

  return {
    ...response,
    vehicles: vehicles.map((v, i) => ({ ...v, image: urls[i] })),
  };
}

export async function getFavoriteIds(user) {
  return favoriteAPI.getFavoriteIds(user);
}

export async function toggleFavorite(user, vehicle) {
  return favoriteAPI.toggleFavorites(user, vehicle);
}

import Image from "next/image";
import Link from "next/link";

import { useActivities } from "@/hooks/useActivities";

interface CardList {
  id: number;
  bannerImageUrl: string;
  reviewCount: number;
  rating: number;
  title: string;
  price: number;
}

const CardList = () => {
  const { data } = useActivities.getActivitiesList();
  const { activities } = data?.data || [];

  return (
    <ul className="mb-16 md:mb-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 md:gap-x-5 gap-y-7 md:gap-y-10">
      {activities?.map(
        ({
          id,
          bannerImageUrl,
          reviewCount,
          rating,
          title,
          price
        }: CardList) => (
          <Link href={`/activities/${id}`}>
            <li key={id}>
              <div className="w-full mb-2 relative rounded-xl overflow-hidden aspect-square">
                <Image
                  className="object-cover"
                  src={bannerImageUrl}
                  alt="모임 이미지"
                  fill
                />
              </div>
              <div className="flex flex-col gap-[2px] md:gap-1">
                <p className="text-xs md:text-sm">
                  <span className="text-black font-semibold">⭐ {rating} </span>
                  <span className="text-gray-a4a1aa">({reviewCount})</span>
                </p>
                <p className="text-black text-sm md:text-base leading-4 md:leading-5 font-semibold">
                  {title}
                </p>
                <p>
                  <span className="text-black text-xs md:text-sm font-bold">
                    ₩ {price}
                  </span>
                  <span className="text-gray-79747e text-xs md:text-sm">
                    &nbsp;/ 인
                  </span>
                </p>
              </div>
            </li>
          </Link>
        )
      )}
    </ul>
  );
};

export default CardList;

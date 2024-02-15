import Link from "next/link";
import Image from "next/image";

export default function MusicCard(props: any) {
  return (
    <div key={props.collectionId} className="flex justify-center">
      <Link href={`/album/${props.collectionId}`}>
        <p className="line-clamp-1">{props.collectionName}</p>
        <div className="w-100 h-100 flex justify-center items-center">
          <Image src={props.artworkUrl100} alt={props.collectionName} width={150} height={150} />
        </div>
      </Link>
    </div>
  );
}

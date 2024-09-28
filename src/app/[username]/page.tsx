import PostCard from "@/_components/admin/posts/post-card";
import { FillImage } from "@/_components/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { posts } from "@/data/mock/posts";
import Image from "next/image";

export default async function UserPage() {
  return (
    <main>
      <div className="relative h-48 md:h-64 rounded-b-lg">
        <Button
          variant={"secondary"}
          className="absolute top-6 right-6 z-20 text-muted-foreground"
        >
          Change cover
        </Button>
        <Image
          src={"/profile-pic.png"}
          layout="fill"
          className="w-full object-cover"
          alt="cover"
        />
        <div className="absolute flex items-center flex-col bottom-[-30px] left-[50%] right-[50%]">
          <FillImage
            src="/profile-pic.png"
            size={95}
            alt="Profile pic"
            className="outline-white outline-2"
          />
        </div>
      </div>
      <div className="px-4 font-circular-medium max-w-[950px] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3">
          {posts.map((item, index) => (
            <PostCard post={item} key={index} />
          ))}
        </div>
        <Card>
          <CardHeader className="flex">
            Follow <span className="text-blue-400">Al-Ameen Adeyemi</span>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Input
              placeholder="Name or @yoursocial (optional)"
              className="rounded-md"
            />
            <Input placeholder="Enter your email" className="rounded-md" />
            <Button className="rounded-full py-5">Follow</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

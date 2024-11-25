import Image from "next/image";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}:{
  
  searchParams : Promise<{query?: string}>
  
}) {

  const query = (await searchParams).query

  const posts = [{_createdAt: new Date(),
                views: '55',
                author: {_id:1, name: 'Jasir'},
                _id: 1,
                description: "This is a description",
                image:"https://cdn.pixabay.com/photo/2015/06/12/18/31/cute-807306_640.png",
                category: 'Robots',
                title: 'We Robots',
            },
          ];


  return (
   <>

      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect with Entreprenours</h1>

        <p className="sub-heading !max-w-3xl"> Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions. </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search resuls for "${query}`: 'All startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index:number) =>(
              <StartupCard key={post?._id} post={post}/>
            ))
          ): (
            <p className="no-results"> No Startups Found</p>
          )}

        </ul>
      </section>

   </>
  );
}
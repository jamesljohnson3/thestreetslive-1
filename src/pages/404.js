export default function Home() {
    return(
        <>
        <section>
            <div className="min-h-screen px-4 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
              <div className="flex flex-col w-full mb-12 text-left lg:text-center">
                <p className="text-2xl max-w-xl mx-auto mt-4 text-left lg:text-center">Looks like you got lost in the party.</p>
                <p className=" max-w-xl mx-auto mt-8 text-left lg:text-center">Did you try searching? Enter a keyword(s) in the search field above or try one of the links below.</p>
              </div>
              <div className="flex flex-row w-full">
                <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
                    <h3>Get help with your site</h3>
                    <ul>
                        <li><p><a href="#">Provident cupiditate voluptatem</a></p></li>
                        <li><p><a href="#">Provident cupiditate voluptatem</a></p></li>
                        <li><p><a href="#">Provident cupiditate voluptatem</a></p></li>
                    </ul>
                </div> 
                <div className="divider divider-vertical"></div> 
                <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
                    <h3>Tips, Tricks and Free tools</h3>
                    <ul>
                        <li><p><a href="#">Provident cupiditate voluptatem</a></p></li>
                        <li><p><a href="#">Provident cupiditate voluptatem</a></p></li>
                        <li><p><a href="#">Provident cupiditate voluptatem</a></p></li>
                    </ul>
                </div>
              </div>
            </div>
          </section>
        </>
    )
}
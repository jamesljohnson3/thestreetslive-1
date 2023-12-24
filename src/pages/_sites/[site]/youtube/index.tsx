// pages/index.tsx
import { GetStaticProps, GetStaticPaths } from 'next';

const HomePage = ({ data }) => {
    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <img src={data.avatar} alt={`Avatar of ${data.title}`} />
            <p>Subscriber Count: {data.subscriberCount}</p>
            <p>Video Count: {data.videoCount}</p>
            <p>View Count: {data.viewCount}</p>

            <h2>Videos</h2>
            <ul>
                {data.videos.map((video) => (
                    <li key={video.id.videoId}>{video.snippet.title}</li>
                ))}
            </ul>

            <h2>Announcement</h2>
            <p>{data.announcement[0]}</p>
            <a href={data.announcement[1]} target="_blank" rel="noopener noreferrer">
                {data.announcement[1]}
            </a>
            <style jsx>{`
        ${data.style || ''}
      `}</style>
            {data.head && <div dangerouslySetInnerHTML={{ __html: data.head }} />}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = 'UCzF4Ryn8TKn64md77gS5Q5Q'; // Replace with the actual channel ID
    const channelFetchUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CbrandingSettings%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;
    const videoFetchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=10&order=date&key=${process.env.YOUTUBE_API_KEY}`;
    const get = async (url: string) => await fetch(url).then((res) => res.json());

    const channelData = {
        data: await get(channelFetchUrl),
    };
    const videoData = {
        data: await get(videoFetchUrl),
    };

    console.log(videoData.data);
    const requiredData = {
        id: channelData.data.items[0].id,
        title: channelData.data.items[0].snippet.title,
        description: 'Welcome to 11Alive: Where Atlanta Speaks. ...', // Replace with the actual description
        avatar: channelData.data.items[0].snippet.thumbnails.default.url,
        banner: channelData.data.items[0].brandingSettings.image.bannerExternalUrl,
        subscriberCount: channelData.data.items[0].statistics.subscriberCount,
        videoCount: channelData.data.items[0].statistics.videoCount,
        viewCount: channelData.data.items[0].statistics.viewCount,
        videos: videoData.data.items,
        announcement: ['Sample Announcement Text', 'https://example.com/announcement'],
        navLinks: ['Home', 'About', 'Contact'], // Replace with actual navigation links
        style: 'body { background-color: #f0f0f0; }', // Replace with actual custom CSS
        head: '<title>11Alive Channel</title>', // Replace with actual custom head content
        subdomain: params?.channel,
        ogimage:
            channelData.data.items[0].brandingSettings.image.bannerExternalUrl ||
            'https://example.com/og-image.jpg', // Replace with actual OG image URL
    };

    return {
        props: {
            data: requiredData,
        },
        revalidate: 60 * 60,
    };
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking',
    };
};

export default HomePage;

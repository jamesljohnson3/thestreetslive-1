import Content from '@/components/Content/index';
import Meta from '@/components/Meta/index';
import { AccountLayout } from '@/layouts/index';
import { useWorkspace } from '@/providers/workspace';

const Workspace = () => {
  const { workspace } = useWorkspace();

  return (
    workspace && (
      <AccountLayout>
        <Meta title={`Unlimited Now - ${workspace.name} | Dashboard`} />
        <Content.Title
          title={workspace.name}
          subtitle="This is your project's workspace"
          
        />
        <Content.Divider />
        <Content.Container />
       
      <div className="div">
          <a className="px-6 py-3 text-center text-blue-600 rounded shadow hover:bg-blue-50" href="https://get.unlimitednow.site/">
          <div className="div-2">
            <picture>
              <source
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F355418110bb646c0881b7eaef16fd495"
                className="image"
              />
            </picture>
            <div className="builder-image-sizer image-sizer" />
          </div>
          <div className="div-3">
            <p>Start an Online Business</p>
          </div>
        </a>
          <a className="px-6 py-3 text-center text-blue-600 rounded shadow hover:bg-blue-50" href="https://shop.unlimitpotential.com/">
          <div className="div-4">
            <picture>
              <source
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fd5de48ca43ef431e8abd9bb2e1285e1f"
                className="image"
              />
            </picture>
            <div className="builder-image-sizer image-sizer-2" />
          </div>
          <div className="div-5">
            <p>Create an Online Store</p>
          </div>
        </a>
          <a className="px-6 py-3 text-center text-blue-600 rounded shadow hover:bg-blue-50" href="http://unlimitednow.me/">
          <div className="div-6">
            <picture>
              <source
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Fe0fccc4eba2a4797945d6ca69825a375"
                className="image"
              />
            </picture>
            <div className="builder-image-sizer image-sizer-3" />
          </div>
          <div className="div-7">
            <p>Create an Ad for Social Media</p>
          </div>
        </a>
          <a className="px-6 py-3 text-center text-blue-600 rounded shadow hover:bg-blue-50" href="http://unlimitednow.me/explore">
          <div className="div-8">
            <picture>
              <source
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2Facb2c5e40bd34dc8b57a6a51e6fb574a"
                className="image"
              />
            </picture>
            <div className="builder-image-sizer image-sizer-4" />
          </div>
          <div className="div-9">
            <p>Explore Ideas and Tools</p>
          </div>
        </a>
          <a className="px-6 py-3 text-center text-blue-600 rounded shadow hover:bg-blue-50" href="https://my.unlimitednow.site/launch">
          <div className="div-10">
            <picture>
              <source
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F09b7d9cf119d47b2a9f83776843a642d"
                className="image"
              />
            </picture>
            <div className="builder-image-sizer image-sizer-5" />
          </div>
          <div className="div-11">
            <p>Customize Your Site</p>
          </div>
        </a>
          <a className="px-6 py-3 text-center text-blue-600 rounded shadow hover:bg-blue-50" href="https://unlimitednow.me/start">
          <div className="div-12">
            <picture>
              <source
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2"
                type="image/webp"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2"
                sizes="(max-width: 638px) 56vw, (max-width: 998px) 36vw, 26vw"
                srcSet="https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2Ffc8480a6998e49d7af4ee889483a2619%2F095e5606bd8043d1aa47deeda9bc48d2"
                className="image-2"
              />
            </picture>
            <div className="builder-image-sizer image-sizer-6" />
          </div>
          <div className="div-13">
            <p>View Checklists and Goals</p>
          </div>
        </a>
      </div>
      <style jsx>{`
        .div {
          position: relative;
          margin-top: 20px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .div {
            width: auto;
            align-self: center;
          }
        }
        .a {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(232, 233, 233, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;
          margin-bottom: 20px;
          text-align: center;
          cursor: pointer;
          pointer-events: auto;
        }
        @media (max-width: 640px) {
          .a {
            width: auto;
            flex-grow: 0;
          }
        }
        .div-2 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .image {
          object-fit: cover;
          object-position: center;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
        }
        .image-sizer {
          width: 100%;
          padding-top: 56.699999999999996%;
          pointer-events: none;
          font-size: 0;
        }
        .div-3 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: 49px;
          margin-bottom: 49px;
        }
        .a-2 {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(232, 233, 233, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 020px;
          margin-bottom: 20px;
          cursor: pointer;
          pointer-events: auto;
        }
        .div-4 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .image-sizer-2 {
          width: 100%;
          padding-top: 56.3%;
          pointer-events: none;
          font-size: 0;
        }
        .div-5 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;
          margin-bottom: 50px;
        }
        .a-3 {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(232, 233, 233, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;
          margin-bottom: 20px;
          cursor: pointer;
          pointer-events: auto;
        }
        .div-6 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .image-sizer-3 {
          width: 100%;
          padding-top: 56.3%;
          pointer-events: none;
          font-size: 0;
        }
        .div-7 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;
          margin-bottom: 50px;
        }
        .a-4 {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(232, 233, 233, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;
          margin-bottom: 20px;
          cursor: pointer;
          pointer-events: auto;
        }
        .div-8 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .image-sizer-4 {
          width: 100%;
          padding-top: 56.3%;
          pointer-events: none;
          font-size: 0;
        }
        .div-9 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: 49px;
          margin-bottom: 49px;
        }
        .a-5 {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(232, 233, 233, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 20px;
          margin-bottom: 20px;
          cursor: pointer;
          pointer-events: auto;
        }
        .div-10 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .image-sizer-5 {
          width: 100%;
          padding-top: 56.3%;
          pointer-events: none;
          font-size: 0;
        }
        .div-11 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;
          margin-bottom: 50px;
        }
        .a-6 {
          display: flex;
          max-width: 357px;
          width: 357px;
          border-radius: 4px;
          border-color: rgba(214, 191, 37, 1);
          border-width: 2px;
          border-style: solid;
          flex-direction: row;
          flex-wrap: wrap;
          margin-left: auto;
          margin-right: auto;
          margin-top: 0px;
          margin-bottom: -5px;
          cursor: pointer;
          pointer-events: auto;
          padding-left: 20px;
          padding-top: 20px;
          padding-right: 20px;
        }
        .div-12 {
          display: flex;
          position: relative;
          min-width: 20px;
          min-height: 20px;
          max-width: 353px;
          width: 353px;
          height: 288px;
        }
        .image-2 {
          object-fit: contain;
          object-position: center;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
        }
        .image-sizer-6 {
          width: 100%;
          padding-top: 56.3%;
          pointer-events: none;
          font-size: 0;
        }
        .div-13 {
          max-width: 175px;
          color: rgba(31, 31, 31, 1);
          font-size: 20px;
          line-height: 30px;
          letter-spacing: 1px;
          text-align: center;
          font-family: Poppins, sans-serif;
          margin-left: auto;
          margin-right: auto;
          margin-top: -49px;
          margin-bottom: 47px;
          padding-top: 32px;
        }
      `}</style>
  
      </AccountLayout>
    )
  );
};

export default Workspace;

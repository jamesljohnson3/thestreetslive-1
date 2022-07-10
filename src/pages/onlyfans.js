import { builder, BuilderComponent } from '@builder.io/react'

builder.init('fc8480a6998e49d7af4ee889483a2619')

export const getStaticProps = async (context) => {
  const content = await builder.get('page', { url: context.resolvedUrl }).promise();

  return { 
    props: { content }, 
    revalidate: true,
    notFound: !content
  }
}

const MyComponent = (props) => (
  <BuilderComponent
    content={props.content}
    model="page" />
)

export default MyComponent;

// Register your components for use in the visual editor!
// https://www.builder.io/blog/drag-drop-react
const Heading = props => (
  <h1 className="my-heading">{props.title}</h1>
)

Builder.registerComponent(Heading, { 
  name: 'Heading',
  inputs: [{ name: 'title', type: 'text' }]
})
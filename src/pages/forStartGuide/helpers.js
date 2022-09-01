const helpers = {
  cdn: 'You can distribute files from your own domain.',
  uuid: 'UUID is a unique identifier of your file on the CDN.',
  blur:
    'Blur images or apply the unsharp masking technique for local contrast enhancement.',
  sharp:
    'Adjust image sharpness. Apply to get attractive visuals from blurred or downscaled images.',
  crop: 'Crops your image by given dimensions and offset.',
  filter: 'Applies one of the 40 photo filters.',
  resize: 'Resizes your image to fit specified dimensions.',
  preview: 'Fits your image to the processing limits.'
}

export const getHelper = name => helpers[name] || `no data for ${name} operator`

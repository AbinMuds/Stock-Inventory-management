FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileValidateSize,
    FilePondPluginImageCrop,
    FilePondPluginFileEncode,
  )
  
// FilePond.setOptions({
//     stylePanelAspectRatio: 150 / 100,
//     imageResizeTargetWidth: 100,
//     imageResizeTargetHeight: 150
// })

FilePond.parse(document.body);
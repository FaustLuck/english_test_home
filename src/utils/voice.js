export default async function submitTextToVoice(text) {
  try {
    let response = await fetch(`https://api.voicerss.org//?key=19371763f18e48789d6a3741515f4800&hl=en-gb&v=Nancy&c=MP3&f=16khz_16bit_stereo&src=${text}`)
    if (response.ok) {
      let blob = await response.blob()
      let src = URL.createObjectURL(blob)
      const audio = new Audio(src);
      audio.play()
    }
  } catch (e) {
    console.log(e)
  }
}
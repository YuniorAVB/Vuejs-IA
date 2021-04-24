export default function({ text }) {
  const textSpeak = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(textSpeak);
}

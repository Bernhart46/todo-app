import "./hr-line.css";
export default function HRLine({ name }: { name: string }) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      aria-label="Section Separator"
      data-label={name}
    ></div>
  );
}

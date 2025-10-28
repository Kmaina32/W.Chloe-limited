import ContentCurationForm from "./components/ContentCurationForm";

export default function ContentCurationPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-2">Content Curation Tool</h1>
      <p className="text-muted-foreground mb-6">
        Automatically create engaging descriptions and social media posts for artists and events.
      </p>
      <ContentCurationForm />
    </div>
  );
}

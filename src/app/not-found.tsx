import { Button, Eyebrow } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="shell section">
      <Eyebrow>404 / PAGE NOT FOUND</Eyebrow>
      <h1>Let’s reconnect.</h1>
      <p>
        This page could not be found. Browse our products or contact the team
        for help.
      </p>
      <div className="actions">
        <Button href="/products">Explore products</Button>
        <Button secondary href="/contact">
          Contact us
        </Button>
      </div>
    </section>
  );
}

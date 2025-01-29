
import { CORE_CONCEPTS } from "../data.js";
import CoreConcepts from "./CoreConcepts";

export default function CoreConcept() {
  return (
    <>
      <section id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {CORE_CONCEPTS.map((item) => (
            <CoreConcepts key={item.title} {...item} />
          ))}
        </ul>
      </section>
    </>
  );
}

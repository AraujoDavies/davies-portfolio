import { useCallback, useEffect, useState } from "react";
import {
  parseResumeVariantFromPath,
  resumePathForVariant,
  resumeVariants,
  type ResumeVariant,
} from "./resume";
import { ResumeDocument } from "./ResumeDocument";
import "./resume.css";

const PDF_FILENAME = "davies-cv";

const variantLabels: Record<ResumeVariant, string> = {
  "product-ai": "A — Product / AI",
  "django-react": "B — Django / React",
};

export function ResumePreview() {
  const [variant, setVariantState] = useState<ResumeVariant>(() =>
    parseResumeVariantFromPath(window.location.pathname),
  );
  const data = resumeVariants[variant];

  useEffect(() => {
    const previous = document.title;
    document.title = PDF_FILENAME;
    return () => {
      document.title = previous;
    };
  }, []);

  const setVariant = useCallback((next: ResumeVariant) => {
    window.history.replaceState(null, "", resumePathForVariant(next));
    setVariantState(next);
  }, []);

  const print = useCallback(() => {
    document.title = PDF_FILENAME;
    window.print();
  }, []);

  return (
    <div className="resume-preview-root">
      <div className="resume-dev-toolbar">
        <p className="resume-dev-label">Currículo</p>
        <div className="resume-dev-actions">
          {(Object.keys(resumeVariants) as ResumeVariant[]).map((key) => (
            <button
              key={key}
              type="button"
              className={
                key === variant ? "resume-dev-btn is-active" : "resume-dev-btn"
              }
              onClick={() => setVariant(key)}
            >
              {variantLabels[key]}
            </button>
          ))}
          <button
            type="button"
            className="resume-dev-btn resume-dev-print"
            onClick={print}
          >
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>
      <div className="resume-preview-stage">
        <ResumeDocument data={data} />
      </div>
    </div>
  );
}

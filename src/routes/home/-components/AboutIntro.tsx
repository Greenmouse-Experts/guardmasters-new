import { Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function AboutIntro() {
  return (
    <>
      <section className="relative overflow-hidden bg-base-100 px-6 py-16 md:px-16">
        <img
          src="/about.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-full select-none opacity-10"
        />
        <div className="container relative mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-base-content md:text-4xl font-pop">
            About Guardmaster Institute Canada
          </h2>
          <div className="max-w-4xl space-y-5 text-base leading-relaxed text-base-content/80">
            <p>
              Guardmaster Institute Canada is a Canadian federally incorporated
              professional certification, corporate training, and consulting
              organization. We deliver internationally accredited and recognized
              certification programs in Corporate Security Management, Loss
              Prevention, Corporate Forensics, Business Continuity Management,
              and Asset Protection. As a trusted leader in professional
              development, we are setting new benchmarks for excellence in the
              industry by delivering globally recognized, practice-focused
              certification programs that equip professionals with the skills,
              credentials, and confidence to lead in today's complex business
              environment.
            </p>
            <p>
              At Guardmaster Institute, we specialize in business resilience
              consulting, training and leadership development. Our programs
              prepare security experts for senior advisory roles. Our programs
              are designed to strengthen organizations across corporate
              security, loss prevention, cybersecurity, ISO standards, business
              continuity, governance, risk, and compliance management.{" "}
              <Link
                to="/home/about"
                className="font-medium text-accent hover:underline"
              >
                Read More...
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-base-100 px-6 pb-16 md:px-16 ">
        <div className="container mx-auto">
          <div className="card bg-accent text-white shadow-2xl rounded-4xl">
            <div className="card-body gap-6 p-8 md:p-12">
              <div className="avatar placeholder">
                <div className="bg-primary text-accent rounded-full w-14 grid place-items-center">
                  <Eye className="h-7 w-7" />
                </div>
              </div>
              <h3 className="card-title text-4xl  font-pop">Our Mission</h3>
              <div className="space-y-4 text-xl">
                <p>
                  At Guardmaster Institute Canada, our mission is to advance
                  corporate security education through practical, innovative,
                  and results-driven training.
                </p>
                <p>
                  We equip security professionals with the strategic thinking,
                  leadership skills, and real-world knowledge needed to
                  anticipate risks, make confident decisions, earn global
                  recognition, and excel in the evolving security industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

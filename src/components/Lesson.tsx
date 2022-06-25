import { CheckCircle, Lock } from "phosphor-react";
import { isPast } from "date-fns";
import { Link, useParams } from "react-router-dom";

import classNames from "classnames";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
    timeZone: "America/Sao_Paulo",
  }).format(new Date(props.availableAt));

  const isActiveLesson = slug === props.slug;

  return (
    <Link to={`/event/lesson/${props.slug}`} className="group">
      <span className="text-gray-300">{availableDateFormatted}</span>

      <div
        className={classNames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActiveLesson,
          }
        )}
      >
        <header className="flex items-center justify-between ">
          {isLessonAvailable ? (
            <span
              className={`text-sm font-medium flex items-center gap-2 ${
                isLessonAvailable ? "text-white" : "text-blue-300"
              }`}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span
              className={`text-sm text-orange-300 font-medium flex items-center gap-2`}
            >
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className="text-xs rounded px-2 py-[2px] text-white border border-green-300 font-medium">
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={`mt-5 block ${
            isActiveLesson ? "text-white" : "text-gray-300"
          }`}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}

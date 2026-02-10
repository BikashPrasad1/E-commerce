import React from "react";
import PropTypes from "prop-types";

const Title = ({ text1, text2, as: TagComponent = "h2", align = "center" }) => {
  const alignmentClass =
    align === "left" ? "justify-start" : "justify-center";

  return (
    <div
      className={`mb-3 inline-flex items-center gap-2 ${alignmentClass}`}
    >
      {React.createElement(
        TagComponent,
        { className: "text-base text-slate-500 sm:text-lg tracking-wide" },
        text1,
        " ",
        React.createElement(
          "span",
          { className: "font-semibold text-slate-800" },
          text2
        )
      )}

      {/* Decorative divider */}
      <span
        className="h-px w-8 bg-gray-700 sm:h-0.5 sm:w-12"
        aria-hidden="true"
      />
    </div>
  );
};

Title.propTypes = {
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  as: PropTypes.elementType,
  align: PropTypes.oneOf(["center", "left"]),
};

export default Title;

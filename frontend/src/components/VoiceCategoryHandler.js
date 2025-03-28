export const processVoiceCategoryCommand = (
  transcript,
  categories,
  selectedCategories,
  setSelectedCategories
) => {
  const lowerCaseTranscript = transcript.toLowerCase();

  // Check for "select <category>" pattern
  if (lowerCaseTranscript.startsWith("select ")) {
    const voiceCategory = lowerCaseTranscript.replace("select ", "").trim();
    const matchedCategory = categories.find(
      (cat) => cat.toLowerCase() === voiceCategory
    );

    if (matchedCategory) {
      if (!selectedCategories.includes(matchedCategory)) {
        setSelectedCategories((prev) => [...prev, matchedCategory]);
      }
      return true; // Indicate we handled a category command
    }
  }

  // Check for "deselect <category>" pattern
  if (lowerCaseTranscript.startsWith("deselect ")) {
    const voiceCategory = lowerCaseTranscript.replace("deselect ", "").trim();
    const matchedCategory = categories.find(
      (cat) => cat.toLowerCase() === voiceCategory
    );

    if (matchedCategory) {
      setSelectedCategories((prev) =>
        prev.filter((cat) => cat !== matchedCategory)
      );
      return true;
    }
  }

  // Check for "clear filters" or "reset filters"
  if (
    lowerCaseTranscript.includes("clear filter") ||
    lowerCaseTranscript.includes("reset filter")
  ) {
    setSelectedCategories([]);
    return true;
  }

  return false; // Not a category command
};

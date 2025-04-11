const validateConfig = (config) => {
    const { columns, rows, probabilities } = config;
  
    // Basic validation
    if (columns <= 0 || rows <= 0) {
      console.error('Invalid grid dimensions.');
      return false;
    }
  
    if (!probabilities.standardSymbols || probabilities.standardSymbols.length === 0) {
      console.error('Standard symbols probabilities must be defined.');
      return false;
    }
  
    if (
      probabilities.standardSymbols.reduce((sum, dist) => sum + dist.count, 0) !== columns * rows
    ) {
      console.error('Standard symbol distribution does not match grid size.');
      return false;
    }
  
    if (probabilities.bonusSymbols && !probabilities.bonusSymbols.symbolName) {
      console.error('Bonus symbol must have a name.');
      return false;
    }
  
    return true;
  };
  
  export default validateConfig;
  
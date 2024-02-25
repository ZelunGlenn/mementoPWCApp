const shuffle = () => {
  const assets = [
    { image: '/assets/13Utopiklogo_square.png' },
    { image: '/assets/100_Thieveslogo_square.png' },
    { image: '/assets/Australs_Esportslogo_square.png' },
    { image: '/assets/BOOM_Esportslogo_square.png' },
    { image: '/assets/China_Nguyenlogo_square.png' },
    { image: '/assets/Cloud9logo_square.png' },
    { image: '/assets/Dreamchaserslogo_square.png' },
    { image: '/assets/Far_East_Societylogo_square.png' },
  ];
  return (
    // two times
    [...assets, ...assets]
      .sort(() => Math.random() - 0.5)
      .map((card) => (
        { ...card, id: Math.random() }
      ))
  );
};

export default shuffle;
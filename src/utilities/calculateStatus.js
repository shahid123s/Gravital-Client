export const calculateStatus = (user) => {
    if (user.isBlock) return { status: 'Blocked' };
    if (user.isBan) return { status: 'Banned' };
    return { status: 'Good' };
  };





export const checkInArray = (arr, elem) => {
  return arr && arr.indexOf(elem) !== -1;
};

export const canModifyComment = (currentUserId, authorId) =>
  currentUserId === authorId;
export const canReply = (currentUserId) => !!currentUserId;
export const isReplying = (activeComment, commentId) =>
  activeComment &&
  activeComment.type === 'replying' &&
  activeComment.id === commentId;

export const isEditing = (activeComment, commentId) =>
  activeComment &&
  activeComment.type === 'editing' &&
  activeComment.id === commentId;

export const readingTime = (body) => {
  const wpm = 225;
  const words = body.trim().split(/\s+/).length;
  return `${Math.ceil(words / wpm)} min read`;
};

export const appendData = (data) => {
  const formData = new FormData();
  for (let [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      value = JSON.stringify(value);
    }
    formData.append(`${key}`, value);
  }
  return formData;
};

export const getReplies = (comments, commentId) => {
  return (
    comments &&
    comments
      .filter((comment) => comment && comment.parentId === commentId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  );
};

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const today = new Date(date);

  return today.toLocaleDateString('en-US', options);
};

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const renderRepeatedSkeletons = (element, count) => {
  let skeletons = [];
  for (let i = 0; i < count; i++) {
    skeletons.push(element);
  }
  return skeletons;
};

export const renderAlternateSkeletons = (elementOne, elementTwo, count) => {
  let skeletons = [];
  for (let i = 0; i < count; i++) {
    if (i % 2 === 0) {
      skeletons.push(elementOne);
    } else {
      skeletons.push(elementTwo);
    }
  }
  return skeletons;
};

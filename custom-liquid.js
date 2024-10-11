export const sortPosts = (posts) =>
  posts.sort((left, right) => {
    const leftField = left.data.modified || left.data.published;
    const rightField = right.data.modified || right.data.published;
    return rightField - leftField;
  });

export function quote(content, author, title) {
  const contentHtml = content.trim().split('\n').join('<br />\n');
  return `
  <blockquote>
      ${contentHtml}
    <footer>-${author}, <cite>${title}</cite></footer>
  </blockquote>
  `;
}

export const paragraph = () => '<p></p>';

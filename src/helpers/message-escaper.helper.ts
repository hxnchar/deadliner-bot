const escapeMessage = (message: string) =>
  message
    .replaceAll('>', '\\>')
    .replaceAll('=', '\\=')
    .replaceAll('.', '\\.')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)')
    .replaceAll('-', '\\-');

export { escapeMessage };

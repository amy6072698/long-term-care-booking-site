export default function getTokenFromCookie() {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const myUserId = document.cookie.replace(
    /(?:(?:^|.*;\s*)myUserId\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const selectProductId = document.cookie.replace(
    /(?:(?:^|.*;\s*)selectProductId\s*=\s*([^;]*).*$)|^.*$/,
    "$1");
  return { token, myUserId, selectProductId };
}

const colors = ["primary", "secondary", "success", "info", "warning", "danger", "light", "dark"];

/**
 * Generates avatar group HTML from a list of names.
 * @param {string[]} names The list of names.
 * @returns {string} The HTML for the avatar group.
 */
export const generateAvatar = (names: string[]): string => {
    const maxAvatars = 5;
    let index = 0;
    const [avatarNames, remainingNames] = [names.slice(0, maxAvatars), names.slice(maxAvatars)];

    const avatarElements = avatarNames.map(name =>{
       const avatar = createAvatarHTML(name, colors[index]);
       index++;
       return avatar
       });
    
    if (remainingNames.length > 0) {
        avatarElements.push(createRemainingAvatarsHTML(remainingNames.length));
      }
    return `
        <div class="avatar-group avatar-group-xs avatar-circle">
        ${avatarElements.join("")}
        </div>
   `
}

const createAvatarHTML = (name: string, color: string): string => {
    const letter = name.charAt(0);
    return `
      <a class="avatar avatar-soft-${color}" href="javascript:;" data-bs-toggle="tooltip" data-bs-placement="top" title="${name}">
        <span class="avatar-initials">${letter}</span>
      </a>
    `;
  }
  
  const createRemainingAvatarsHTML = (count: number): string => {
    return `
      <a class="avatar avatar-soft-light" href="javascript:;" data-bs-toggle="tooltip" data-bs-placement="top" title="+${count}">
        <span class="avatar-initials">+${count}</span>
      </a>
    `;
  }
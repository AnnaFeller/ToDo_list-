import {BASE_URL} from "@/shared/constants/index.js";

const RouterLink = ({ to, children, onClick, ...rest }) => {
    const handleClick = (event) => {
        if (onClick) onClick(event);

        if (
            !event.defaultPrevented &&
            event.button === 0 && // Только левый клик
            (!rest.target || rest.target === '_self') &&
            !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
        ) {
            event.preventDefault();
            window.history.pushState({}, '', to);
            window.dispatchEvent(new PopStateEvent('popstate'));
        }
    };

    return (
        <a href={`${BASE_URL}${to}`} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
};

export default RouterLink;
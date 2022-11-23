import { render, screen } from '@testing-library/react';
import Login from '../Login';


// describe('Centered container- auth - tests: ', () => {
//     let container: HTMLDivElement;
//     beforeEach(() => {
//         container = createElement('div');
//         document.body.appendChild(container);
//         ReactDOM.render(<Container children={undefined} />, container);
//     })
//     afterEach(() => {
//         document.body.removeChild(container);
//         container.remove();
//     })
// });

test('renders APP component: ', () => {
    render(<Login />);
    const linkElement = screen.getByText(/email/i)
    expect(linkElement).toBeInTheDocument()
})
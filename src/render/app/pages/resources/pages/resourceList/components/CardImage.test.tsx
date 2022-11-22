import React from "react";
import { create } from "react-test-renderer";
import { CardImage } from "./CardImage";

describe("CardImage component", () => {
    test("it should trigger onClickImage when component clicked", () => {
        const mockCallClickImage = jest.fn();

        const instance = create(<CardImage thumbnail="test" alt="test" onClickImage={mockCallClickImage} />).root;
        const div = instance.findByProps({ className: 'card-image__wrapper' });
        div.props.onClick();
        expect(mockCallClickImage.mock.calls.length).toEqual(1);
    });

});
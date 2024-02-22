import React from "react";
import { mount } from "enzyme";
import BmiForm from "./BmiForm";

describe("BmiForm Component", () => {
  let wrapper;
  const prop = {
    change: jest.fn()
  };

  beforeEach(() => {
    wrapper = mount(<BmiForm {...prop} />);
  });

  it("renders", () => {
    expect(wrapper).not.toBeNull();
  });

  it("should update the weight", () => {
    const weight = wrapper.find("#weight");
    weight.simulate("change", { target: { name: "weight", value: "50" } });
    expect(wrapper.find("#weight").props().value).toEqual("50");
  });

  it("should update the height", () => {
    const height = wrapper.find("#height");
    height.simulate("change", { target: { name: "height", value: "176" } });
    expect(wrapper.find("#height").props().value).toEqual("176");
  });

  it("should call change", () => {
    /**
     * @see {@link https://github.com/enzymejs/enzyme/issues/308#issuecomment-291604063}
     */
    wrapper.find("button").simulate("submit");
    expect(prop.change).toHaveBeenCalledTimes(1);
  });
});

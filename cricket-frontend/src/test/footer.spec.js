import Footer from "../components/Footer";
import React from "react";
import { screen } from "@testing-library/react";
// please add your test cases here

import { render } from "@testing-library/react";
// import Card from '../Components/card/Card';
// please add your test cases here

describe("Testing Cards", () => {
  it("Should have Footer classname in Footer", () => {
    // render(<Footer/>);
    const { container } = render(<Footer />);

    // const foo = container.getElementsByClassName("footer");
    // console.log(foo);
  });

  it("Should have 1 Footer classname in Footer", () => {
    // render(<Footer/>);
    const { container } = render(<Footer />);

    // const foo = container.getElementsByClassName("footer");
    // console.log(foo);
    // expect(foo.length).toBe(1);
  });

  it("Should have items in Footer", () => {
    // render(<Footer/>);
    const { container } = render(<Footer />);

    // const foo = container.getElementsByClassName("footer");
    // console.log(foo.item);
  });

  it("Should have footer div in Footer", () => {
    // render(<Footer/>);
    const { container } = render(<Footer />);

    // const foo = container.getElementsByClassName("footer");
    // console.log(foo);
  });

  //  it("Should have fetch class with testid in Footer",()=>{
  //         render(<Footer/>)
  //         expect(screen.findAllByTestId('copyright'))[0].toHaveClass('footer')

  //     })

  // it("Should have footer class in navbar barnd link",()=>{
  //     render(<Footer/>)
  //     expect(screen.getByTestId("copyright")).toHaveClass("footer")
  // })

  // it("Should have fetch class with testid in Footer",()=>{
  //     render(<Footer/>);
  //     expect(screen.getByTestId('copyright')).toHaveTextContent("copyright © GP Pvt. Limited 2022");

  // })

  // it('should equal 5',()=>{
  //     expect(2+3).toBe(5);
  // })
});

export default Footer;

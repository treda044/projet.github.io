import { Card, CardBody } from "reactstrap";

const TopCards = (props) => {
  return (
    <Card className={`${props.bg}`}>
      <CardBody>
        <div className="d-flex">
          <div className={`circle-box lg-box d-inline-block`}>
            <i className={props.icon}></i>
          </div>
          <div className="ms-3">
            <h3 className="mb-0 font-weight-bold">{props.earning}</h3>
            <span className="text-white">{props.subtitle}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default TopCards;

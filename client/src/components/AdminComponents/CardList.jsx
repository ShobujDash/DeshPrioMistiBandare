import React, { useEffect, useState } from "react";


const CardList = ({ allOrder, allUser, allPayment }) => {
  return (
    <ul className="box-info">
      <li>
        <i className="bx bxs-calendar-check"></i>
        <span className="text">
          <h3>{allOrder?.length}</h3>
          <p>মোট অর্ডার</p>
        </span>
      </li>
      <li>
        <i className="bx bxs-group"></i>
        <span className="text">
          <h3>
            {allUser?.length} <span>জন</span>{" "}
          </h3>
          <p>মোট কাস্টমার সংখ্যা</p>
        </span>
      </li>
      <li>
        <i className="bx bxs-dollar-circle"></i>
        <span className="text">
          <h3>
            {allPayment.reduce((acc, curr) => acc + Number(curr?.price), 0)}{" "}
            <span>টাকা </span>{" "}
          </h3>
          <p>মোট বিক্রয় </p>
        </span>
      </li>
    </ul>
  );
};

export default CardList;

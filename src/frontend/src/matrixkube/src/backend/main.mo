import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

actor {
  type Submission = {
    name : Text;
    email : Text;
    company : Text;
    message : Text;
    timestamp : Int;
  };

  module Submission {
    public func compare(s1 : Submission, s2 : Submission) : Order.Order {
      Int.compare(s1.timestamp, s2.timestamp);
    };
  };

  let submissions = List.empty<Submission>();

  let owner : Principal = Principal.fromText("2vxsx-fae");

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, company : Text, message : Text) : async () {
    let newSubmission : Submission = {
      name;
      email;
      company;
      message;
      timestamp = Time.now();
    };
    submissions.add(newSubmission);
  };

  public shared ({ caller }) func getAllSubmissions() : async [Submission] {
    if (caller != owner) {
      Runtime.trap("Access denied: only admin can retrieve submissions");
    };
    submissions.toArray().sort();
  };
};

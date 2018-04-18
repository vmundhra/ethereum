import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends Component {
  state = {
    description: "",
    value: "",
    recipient: "",
    errorMessage: "",
    loading: false
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    const { address } = this.props;
    const campaign = Campaign(address);
    const { description, value, recipient } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
        .send({
          from: accounts[0]
        });

      Router.pushRoute(`/campaigns/${address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const { description, value, recipient, errorMessage, loading } = this.state;
    return (
      <Layout>
        <Link route={`/campaigns/${this.props.address}/requests`}>
          <a>Back</a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={description}
              onChange={e => this.setState({ description: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Value in Ether</label>
            <Input
              value={value}
              onChange={e => this.setState({ value: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Recipient</label>
            <Input
              value={recipient}
              onChange={e => this.setState({ recipient: e.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={errorMessage} />
          <Button loading={loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RequestNew;

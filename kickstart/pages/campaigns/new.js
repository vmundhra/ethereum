import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class CampaignNew extends Component {
  state = { minimumContribution: "", errorMessage: "", loading: false };

  onSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({ from: accounts[0] });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const { errorMessage, loading } = this.state;
    return (
      <Layout>
        <h3>Create a campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!errorMessage}>
          <Form.Field>
            <label>Minimum Contibution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={e =>
                this.setState({ minimumContribution: e.target.value })
              }
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

export default CampaignNew;
